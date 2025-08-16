import axios from 'axios';

export async function sendSMS(code: string, phone: string) {
  try {
    const data = {
      bodyId: 355847,
      to: phone,
      args: [code],
    };

    await axios.post(
      'https://console.melipayamak.com/api/send/shared/fac987323af344c3b35f7781863ab860',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error) {
    console.error('Error sending SMS:', error.response?.data || error.message);
    return false;
  }
}
