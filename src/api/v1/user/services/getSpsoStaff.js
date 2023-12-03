import user from '#~/model/user.js';
import {} from 'dotenv/config';
const access_token_key = process.env.ACCESS_TOKEN_KEY;

async function getSpsoStaff({ user_id }) {
  try {
    // not handle case when student use this api
    const managerList = await user
      .find({
        role: { $in: ['staff', 'spso'] },
        _id: { $ne: user_id },
      })
      .select({
        _id: 1, // Exclude the default _id field
        receiver_id: '$_id', // Rename _id to receiver_id
        location: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        role: 1,
      });

    return managerList;
  } catch (err) {
    return Promise.reject({ status: 500, message: 'System Error' });
  }
}

export default getSpsoStaff;
