import React from 'react';
import Form from './Form';

const App = () => {
  return (
    <>
      <header className="container">
        <div className="row justify-content-center p-4 mt-4">
          <div className="logo">
            <img
              src="img/sigma-logo.png"
              className="img-fluid"
              alt="sigma-logo.png"
            />
          </div>
        </div>
      </header>
      <main className="container">
        <section className="text-center">
          <h1>Prueba de desarrollo Sigma</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur cupiditate rem, omnis nobis ipsa suscipit quidem est
                deserunt dolore accusantium quod maxime labore doloremque
                repellendus culpa voluptates veritatis. Veritatis, quis?
              </p>
            </div>
          </div>
        </section>

        <div className="row mb-5 pb-4 justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src="img/sigma-image.png"
              className="img-fluid"
              alt="sigma-image"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <Form />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
