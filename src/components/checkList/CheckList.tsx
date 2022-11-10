import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2'
import { fetchChecks, submitCheckResults } from "../../mockApi/api"
import { APIError } from "../../types/apiError";
import { Check } from "../../types/check";
import { CheckResult } from "../../types/checkResult";
import { sortChecksByPriority } from "../../utils/utilities";
import Button from "../shared/Button";
import CheckItem from "./checkItem/CheckItem";


/**
 * Wrapper to display list of checks
 * @returns Array of JSX.Elements
 */
const CheckList: FunctionComponent = () => {
  
  // State to get all the information about checks
  const checks = useRef<Check[]>([])

  // Array of JSX.Elements to just render once the list and not each element in a map()
  const [uiGeneratedForChecks, setUiForChecks] = useState<JSX.Element[]>([])
  
  // Ref to count the index of the element focused
  const counterForFocus = useRef<number>(0)

  // HTML Element which is currently focused
  const currentElmFocused = useRef<any>()


  // Function to update user's answers
  const onSelectAnswer = (id: string, isYesAnswer: boolean = false): void => {
    if(isYesAnswer) {
      updateChecklist(id, true)
    } else {
      updateChecklist(id, false)
    }
  }

  const updateChecklist = (id: string, nextEnabled: boolean): void => {
    const checksAuxiliar = [...checks.current]
    
    for(let i=0; i < checksAuxiliar.length; i++) {
      // If the checkId answered are equal, we evaluate
      if(checksAuxiliar[i].id === id) {
        // User replied 'yes', so we update the optionSelected key to 'yes'
        if(nextEnabled) {
          checksAuxiliar[i].optionSelected = 'yes'
         
         /* 
          * If index is different than the checks length, we can enable
          * following checks depending on if we want to enable just the following
          * check or if we want to enable all of the following ones because before
          * user selected an option (yes/no)
          */
          if(i !== checksAuxiliar.length - 1) {
            for(let h=i+1; h < checksAuxiliar.length; h++) {
              if(checksAuxiliar[h].optionSelected) {
                checksAuxiliar[h].enabled = true
              } else {
                checksAuxiliar[h].enabled = true
                break
              }
            }
          } else {
            // We need to enable the last check of the list
            checksAuxiliar[i].enabled = true
          }
        } else {
          checksAuxiliar[i].optionSelected = 'no'
          
          // We disable following checks less we're positioned since optionSelected was 'no'
          for(let j=i+1; j < checksAuxiliar.length; j++) {
            checksAuxiliar[j].enabled = false
          }
        }
        break
      } 
    }
    checks.current = [...checksAuxiliar] // Update checks array with the information modified
    setUiForChecks([...getUiForChecks(checks.current)]) // Updating UI with new information selected
  }
  
  /* 
   * Function to generate the UI of checks in an array and render all of them once without mapping
   * This is an optimization addition to allow to render multiple checks in case they were 1 million or more at once
   * without having a problem of rendering each check one by one.
   */
  const getUiForChecks = (checks: Check[]): JSX.Element[] => {
    return checks.map((check: Check, idx: React.Key) => {
      const newProps = {
        onSelectAnswer: onSelectAnswer,
        ...check
      }
      return <CheckItem key={idx} {...newProps} />
    })
  }

  // Function to determine if the Submit button is enabled
  const disableSubmitButton = (): boolean => {
    return checks.current.some(check => (check.optionSelected === 'no' || check.optionSelected === ''))
  }

  // Function to manipulate keyboard shortcuts (ArrowDown, ArrowUp, 1 like yes, 2 like no)
  const handleKeyDown = (event: any) => {
    if(!currentElmFocused.current) {
      currentElmFocused.current = event.target.children[1].children[counterForFocus.current]
    } else {
      switch(event.key) {
        case 'ArrowDown':
          if (
            checks.current[counterForFocus.current].optionSelected === 'yes' && 
            counterForFocus.current !== checks.current.length
          ) {
            const counterIncreased = counterForFocus.current + 1
            currentElmFocused.current = currentElmFocused.current.parentElement?.children[counterIncreased]
            counterForFocus.current += 1
          }
          break
        case 'ArrowUp':
          if (counterForFocus.current !== 0) {
            const counterDecresed = counterForFocus.current - 1
            currentElmFocused.current = currentElmFocused.current.parentElement?.children[counterDecresed]
            counterForFocus.current -= 1
          }
          break
        case '1':
          currentElmFocused.current.children[1].children[0].click()
          break
        case '2':
          currentElmFocused.current.children[1].children[1].click()
          break
      }
    }
    currentElmFocused.current?.focus()
  };

  const handleSubmitClick = (): void => {
    const answersFromUser = checks.current.map(check => {
      return {
        checkId: check.id,
        result: 'yes' // All the checks need to be marked with 'yes' to be able to submit it
      }
    })
    console.log("Answers from user >>>", answersFromUser)
    
    // Submitting checks from the user to the MOCK API
    submitCheckResults(answersFromUser)
    .then((results: CheckResult[]) => {
      Swal.fire({
        title: 'Success!',
        text: 'Check answers were sent successfully.',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'Button buttonBgColor'
        }
      })
    })
    .catch((error: APIError) => {
      Swal.fire({
        title: 'Error!',
        text: 'Oops an error has occurred submitting checks answers',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'Button buttonBgColor'
        }
      })
    })
  }

  useEffect(() => {
    // We just call the API when the uiGeneratedForChecks is empty or doesn't exist
    if(uiGeneratedForChecks && uiGeneratedForChecks.length === 0) {
      fetchChecks()
      .then((results: Check[]) => {
        // We fetch checks and sort by priority
        const sortedChecks = sortChecksByPriority(results).map((check, idx) => {
          return {  
            ...check,
            enabled: idx === 0, // We just enable the first check, others will be disabled
            optionSelected: '' // By default all answers will be empty unless the user marks yes/no
          }
        })
        
        checks.current = [...sortedChecks] // Update array of checks, we use Ref to not apply a re-render
        setUiForChecks([...uiGeneratedForChecks, ...getUiForChecks(sortedChecks)]) // We generate the list of checks built as JSX.elements
      }).catch((error: APIError) => {
        console.log('Fetch Check API failed to get checks', error)
      })
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () =>  window.removeEventListener('keydown', handleKeyDown);
  })

  return (
    <>
      {
        uiGeneratedForChecks && uiGeneratedForChecks.length ? 
          uiGeneratedForChecks
        : null
      }
      <Button 
        disabled={disableSubmitButton()} 
        onClick={handleSubmitClick}
      >
        {'Submit'}
      </Button>
    </>
  )
}

export default CheckList;