
import React from 'react';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AuthComponent from './src/components/account/signup';
import { describe } from 'node:test';


describe("AuthComponent", ()=>{
  it("renders correctly", ()=>{
    const {getByText} = render (<AuthComponent/>);
    expect(getByText("Hello, world!")).toBeInTheDocument()
   })
})