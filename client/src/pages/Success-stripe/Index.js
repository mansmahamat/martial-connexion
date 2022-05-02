/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useParams } from 'react-router-dom';


export const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className="product Box-root">
        LOGO {sessionId}
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input type="hidden" id="session-id" name="session_id" value={sessionId} />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};
