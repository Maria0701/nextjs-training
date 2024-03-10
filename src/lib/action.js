'use server'
import { revalidatePath } from 'next/cache';
import { connectToDb } from './connectToDb';
import { Post, User } from "./models";
import { signOut, signIn } from './auth';
import bcrypt from 'bcryptjs';

export const addPost = async (previusState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);
  try {
    connectToDb()
    const newPost = new Post({
      title,
      desc,
      slug, userId
    });

    await newPost.save();
    revalidatePath('/blog');
    revalidatePath('/admin');

  } catch(e) {
    return {error: 'Something went wrong!'};
  }
}

export const deletePost = async (previusState,formData) => {
  const { postId } = Object.fromEntries(formData);
  try {
    connectToDb()
    await Post.findByIdAndDelete(postId);
    revalidatePath('/blog');
    revalidatePath('/admin');
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
};

export const addUser = async (previusState, formData) => {
  const { 
    username, 
    email, 
    password, 
    img, 
    isAdmin 
  } =Object.entries(formData);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    connectToDb()
    const newUser = new User({
      username, 
      email, 
      password: hashedPassword, 
      img, 
      isAdmin,
    });

    await newUser.save();
    revalidatePath('/admin')
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
}

export const updateUser = async (formData) => {
  const { 
    username, 
    email, 
    password, 
    img, 
    isAdmin 
  } =Object.fromEntries(formData);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    connectToDb()
    const newUser = new User({
      username, 
      email, 
      password: hashedPassword, 
      img, 
      isAdmin,
    });

    await newUser.save();
    revalidatePath('/admin')
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
}

export const deleteUser  = async (formData) => {
  const { 
    id
  } = Object.fromEntries(formData);
  try {
    connectToDb()
    await Post.deleteMany({userId: id});
    await User.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/blog');
  } catch(e) {
    return {error: 'Something went wrong!'};
  }
};

export const logOutHandler = async() => { 
  await signOut()
};

export const register = async (previusState, formData) => {
 const { 
  username, 
  email, 
  password, 
  img, 
  passwordRepeat
} = Object.fromEntries(formData);
  
 if (password !== passwordRepeat) {return 'Passwords do not match'};
 if (!password) {
  return 'Password required'
 }

 try {
  connectToDb();
  const userExists = await User.findOne({username});
  if (userExists) {
    return {error: 'user exists'};
  };

  const userEmail = await User.findOne({email});
  if (userEmail) {
    return {error: 'user with this email exists'};
  };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    img,
  });

  await newUser.save();
  console.log('saved to db');
  return { success: true };
 } catch(e) {
  console.log(e);
  return {error: 'Something went wrong'};
 } 
};

export const login = async (previusState, formData) => {
  let responseRedirectUrl = null;
  const { username, password } = Object.fromEntries(formData);

  if (!password || !username) {
    return {error: 'Password and username required'};
  }
 
  try {
   await signIn('credentials', {username, password});   
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  } finally {
    if (responseRedirectUrl) redirect(responseRedirectUrl);
  } 
 };
