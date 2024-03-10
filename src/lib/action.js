'use server'
import { revalidatePath } from 'next/cache';
import { connectToDb } from './connectToDb';
import { Post, User } from "./models";
import { signOut } from './auth';
import bcrypt from 'bcrypt';

export const addPost = async (formData) => {
  const { title, desc, slug, userId } =Object.entries(formData);
  try {
    connectToDb()
    const newPost = new Post({
      title,
      desc,
      slug, userId
    });

    await newPost.save();
    revalidatePath('/blog')
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
}

export const deletePost = async (formData) => {
  const { postId } = Object.entries(formData);
  try {
    connectToDb()
    await Post.findByIdAndDelete(postId);
    revalidatePath('/blog')
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
};

export const logOutHandler = async() => { 
  await signOut()
}


export const register = async (formData) => {
 const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);
  
 if (password !== passwordRepeat) {return 'Passwords do not match'};
 if (!password) {
  return 'Password required'
 }

 try {
  console.log(1)
  connectToDb();
  const userExists = await User.findOne({username});
  if (userExists) {return 'user exists'};
  console.log(2);

  const userEmail = await User.findOne({email});
  if (userEmail) {return 'user with this email exists'};

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword)
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    img,
  });
  console.log(newUser)
  await newUser.save();
  console.log('saved to db');

 } catch(e) {
  console.log(e);
  return {error: 'Something went wrong'};
 } 
}
