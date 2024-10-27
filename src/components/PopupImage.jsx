import { useState } from 'react';
import Popup from 'reactjs-popup';

const PopupImage = ({ img }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div class="modal-dialog modal-fullscreen-sm-down">
      {!open ? (
        <img
          onClick={() => handleClick()}
          src={img}
          alt="Popup Product"
          style={{ width: '100%' }}
        />
      ) : (
        <div>
          <Popup
            open={open}
            onClose={() => setOpen(false)}
            closeOnDocumentClick={false} // Disable closing on background click for full-screen popups
            overlayStyle={{
              background: 'rgba(0, 0, 0, 0.8)', // Dark semi-transparent background
              position: 'fixed', // Fix position
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999, // Ensure it covers other elements
            }}
            contentStyle={{
              border: 'none', // No border
              borderRadius: '0', // No rounded corners
              width: '100%', // Full width
              height: '100%', // Full height
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white', // Background color for the content
              zIndex: 10000, // Higher z-index for content
            }}
          >
            <div className="popup-content">
              <img
                onClick={() => handleClick()}
                src={img}
                alt="Popup Product"
                style={{ width: '100%' }}
              />
              <button onClick={() => setOpen(false)}>&times;</button>
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
};

export default PopupImage;
