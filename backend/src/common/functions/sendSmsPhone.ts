import axios from 'axios';

const username: string = process.env.MELIPAYAMAK_USERNAME!;
const password: string = process.env.MELIPAYAMAK_PASSWORD!;
const url: string = process.env.MELIPAYAMAK_API_URL!;
const from: string = process.env.MELIPAYAMAK_PHONE!;

export async function sendSMS(phone: string, text: string) {
  try {
    const data = {
      username,
      password,
      from,
      to: phone,
      text,
    };

    const response = await axios.post(url, data);
    console.log('SMS Sent:', response.data);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}
