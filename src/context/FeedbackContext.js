import { createContext, useState } from "react";
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState([
    {
    id: 1,
    text: "This is feedback number 1 ",
    rating: 10,
    },
    {
    id: 2,
    text: "This is feedback number 2 ",
    rating: 8,
    },
    {
    id: 3,
    text: "This is feedback number 3 ",
    rating: 6,
    },
    {
    id: 4,
    text: "This is feedback number 4 ",
    rating: 8,
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

//////////// DELETE FEEDBACK FUNCTION 
  const deleteFeedback = (id) => {
    // console.log('app' , id) 
    if(window.confirm('Are you sure you want to delete ? ')){
      setFeedback(feedback.filter((item) => item.id !== id ))
    }
  }
//// /// SET ITEM TO BE UPDATED .......
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }
// //// EDIT FEEDBACK FUNCTION 
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  ///// UPDATE FEEDBACK ITEM .
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item ))
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext