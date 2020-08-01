import React from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
const Hello = props => (
  <div>
    {props.db.sheet1.map(data => (
      <span>{data.id}</span>
    ))}
  </div>
);
export default withGoogleSheets('sheet1')(Hello);