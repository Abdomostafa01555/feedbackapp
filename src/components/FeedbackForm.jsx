import React,{useState, useContext, useEffect} from 'react'
import FeedbackContext from '../context/FeedbackContext';
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm( ) {
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    
    ///// the code below if specifically feedbackEdit is not a function it's a piece of state from the context
    ////  and when you make any changes to it you make changes to the form so you can do that by what|??? 
    /////// only by useEffect hoook siiiiiiiiiii
    const {addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit]);
    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null) 
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        }else {
            setMessage(null) 
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text, 
                rating 
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }else {
                addFeedback(newFeedback)
            }
            setText('')
        }
    } 
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className="input-group">
            <input type="text"
             onChange={handleTextChange}
             placeholder='Write a review'
             value={text}
             />
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
