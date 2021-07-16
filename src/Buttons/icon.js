import React from 'react';
import Button from '@material-ui/core/Button';
import "index.css";


function IconButtons(props) {
  return (
    <div>
      <div className="jr-btn-group">
        <Button variant="contained"  style={props.styles} className="jr-btn jr-btn-label left btnSmall">
          <span>{props.id}</span>
        </Button>  
      </div>
    </div>
  );
}

export default (IconButtons);