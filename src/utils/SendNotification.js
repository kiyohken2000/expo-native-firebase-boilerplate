import axios from "axios";
import firestore from '@react-native-firebase/firestore';

const sendNotification = async({title, body, id, data}) => {
  try {
    const docSnapshot = await firestore().collection('tokens').doc(id).get();
    if(!docSnapshot.exists) return null
    const { token } = docSnapshot.data()
    const response = await axios.post(
      'https://exp.host/--/api/v2/push/send',
      {
        'to': token,
        'title': title,
        'body': body,
        'data': { data }
      },
      {headers: {'Content-Type': 'application/json'}}
    )
    const { status } = response
    if(!status === 200) return null
    return status
  } catch(e) {
    console.log(e)
    return null
  }
}

export { sendNotification }