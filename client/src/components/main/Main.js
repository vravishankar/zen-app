import React from "react";

export default function Main() {
  return (
    <>
      <div className="d-flex flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Home</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Welcome to Zen Application</h3>
            <p className="lead">
              Please use the links on the side menu to explore the zenportal. Be Zenned.
            </p>
            <h4 className="mt-4 mb-3">About Zen</h4>
            <div className="card-deck">
              <div className="card">
                <img className="card-img-top" src="..." alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Information at Fingertips</h5>
                  <p className="card-text">
                    It's a broader card with text below as a natural lead-in to
                    extra content. This content is a little longer.
                  </p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src="..." alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Better Collaboration</h5>
                  <p className="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src="..." alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Delighted Customer</h5>
                  <p className="card-text">
                    It's a broader card with text below as a natural lead-in to
                    extra content. This content is a little longer.This card has
                    even longer content than the first to show that equal height
                    action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
