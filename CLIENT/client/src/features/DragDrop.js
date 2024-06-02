// import React, { useRef, useEffect } from 'react';

// const DragDrop = () => {
//   const cardRef = useRef(null);
//   let newX = 0, newY = 0, startX = 0, startY = 0;

//   useEffect(() => {
//     const card = cardRef.current;

//     if (card) {
//       card.addEventListener('mousedown', mouseDown);
      
//       // Cleanup event listeners on component unmount
//       return () => {
//         card.removeEventListener('mousedown', mouseDown);
//         document.removeEventListener('mousemove', mouseMove);
//         document.removeEventListener('mouseup', mouseUp);
//       };
//     }

//     function mouseDown(e) {
//       startX = e.clientX;
//       startY = e.clientY;

//       document.addEventListener('mousemove', mouseMove);
//       document.addEventListener('mouseup', mouseUp);
//     }

//     function mouseMove(e) {
//       newX = startX - e.clientX;
//       newY = startY - e.clientY;

//       startX = e.clientX;
//       startY = e.clientY;

//       card.style.top = (card.offsetTop - newY) + 'px';
//       card.style.left = (card.offsetLeft - newX) + 'px';
//     }

//     function mouseUp(e) {
//       document.removeEventListener('mousemove', mouseMove);
//       document.removeEventListener('mouseup', mouseUp);
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor: 'lightblue' }}
//     >
//       Drag me
//     </div>
//   );
// };

// export default DragDrop;
