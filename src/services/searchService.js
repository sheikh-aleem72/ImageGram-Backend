import User from '../schema/user.js';

export const searchService = async (query) => {
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ]
    })
      .select('username name profilePic') // return only required fields
      .limit(10);

    return users;
  } catch (error) {
    console.log('Error from searchService: ', error);
    throw error;
  }
};
