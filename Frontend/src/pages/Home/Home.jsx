import Header from 'components/Header/Header';
import UpdateForm from 'components/UpdateForm/UpdateForrm';
import ValidationTable from 'components/ValidationTable/ValidationTable';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <section className='w-screen h-screen'>
      <Header />
      <ToastContainer />

      <div className='grid grid-flow-col pr-4 m-4'>
        <UpdateForm />
        <ValidationTable />
      </div>
    </section>
  );
}

export default Home;