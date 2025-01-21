import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import FloatMessage from '../../components/floatMessage/FloatMessage'
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBotReducer, SearchBotReducer2 } from '../../redux/actions/embedded/Embedded';

const Embedded = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useParams();
  const {rex_token_chat} = useSelector(({home}:RootState) =>home)
  /* useEffect(() => {
    if(token){
      dispatch(SearchBotReducer2(token))
      console.log("hola")

    }
  }, [token])
 */
  return (
    <>
      {
         token ? (
          <FloatMessage
            idChatBot={0}
            embedded={true}
            tokenChatbot={token}
          />
        ) : null
      }
    </>
  )
}

export default Embedded