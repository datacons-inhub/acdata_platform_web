import React from 'react';
{/*import {
  GoogleIcon,
  MicrosoftIcon
} from '../../../utils/Icons';  */}// Asegúrate de tener los íconos
import { SignUpContainer, LeftSection, OAuthButton, Divider, Form, Input, Button } from './SignUpModal.styles';
import { ImageSliderWrapper } from './ImageSlider.styles';
import ImageSlider from './SlideShow';

const SignUp = () => {
  return (
    <SignUpContainer>
      <LeftSection>
        <h1>Sign Up</h1>
        <p>Free 7-day trial, no credit card needed.</p>
        
        <OAuthButton bgColor="#4285F4" color="#fff">
          <i className="fa fa-google"></i> Sign up with Google
        </OAuthButton>
        <OAuthButton bgColor="#0078D4" color="#fff">
          <i className="fa fa-microsoft"></i> Sign up with Microsoft
        </OAuthButton>

        <Divider>OR</Divider>

        <Form>
          <Input type="email" placeholder="Enter your email" />
          <Input type="password" placeholder="Enter your password" />
          <Button>Start your free trial</Button>
        </Form>

        <p>Already have an account? <a href="/login">Sign In</a></p>
      </LeftSection>

 
      <ImageSliderWrapper>
          <ImageSlider />
        </ImageSliderWrapper>
    </SignUpContainer>
  );
};
export default SignUp;
