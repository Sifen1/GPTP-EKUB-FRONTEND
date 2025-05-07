import React, { useEffect, useRef, useState } from "react";

const WheelSpinner = ({ participants, spinning, winner, onSpinComplete }) => {
  const canvasRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [finalAngle, setFinalAngle] = useState(0);
  const colors = ["#FF5252", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#FF9800"];

  // Calculate the final angle to stop at winner when spinning is complete
  useEffect(() => {
    if (winner && participants.length > 0) {
      const winnerIndex = participants.findIndex(p => p._id === winner._id);
      if (winnerIndex >= 0) {
        const segmentAngle = 360 / participants.length;
        const winnerAngle = segmentAngle * winnerIndex;
        // Add extra rotations and align winner segment with pointer
        const targetAngle = 1440 + (360 - winnerAngle - segmentAngle / 2);
        setFinalAngle(targetAngle);
      }
    }
  }, [winner, participants]);

  // Handle the animation of the wheel
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext("2d");
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    const drawWheel = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw the wheel with segments
      if (participants.length > 0) {
        const segmentAngle = 2 * Math.PI / participants.length;
        
        for (let i = 0; i < participants.length; i++) {
          const startAngle = i * segmentAngle - Math.PI / 2 + rotationAngle * (Math.PI / 180);
          const endAngle = (i + 1) * segmentAngle - Math.PI / 2 + rotationAngle * (Math.PI / 180);
          
          // Draw segment
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = colors[i % colors.length];
          ctx.fill();
          ctx.stroke();
          
          // Draw text
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(startAngle + segmentAngle / 2);
          ctx.textAlign = "right";
          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px Arial";
          ctx.fillText(participants[i].name, radius - 20, 5);
          ctx.restore();
        }
      }
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
      
      // Draw pointer
      ctx.beginPath();
      ctx.moveTo(centerX + radius + 10, centerY);
      ctx.lineTo(centerX + radius - 15, centerY - 15);
      ctx.lineTo(centerX + radius - 15, centerY + 15);
      ctx.closePath();
      ctx.fillStyle = "#333";
      ctx.fill();
    };
    
    drawWheel();
  }, [participants, rotationAngle]);

  // Animation effect for spinning
  useEffect(() => {
    let animationId;
    let startTime;
    let duration = 4000; // Match your 4000ms timeout
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (spinning) {
        // Fast rotation while spinning
        setRotationAngle((prevAngle) => (prevAngle + 5) % 360);
      } else if (winner) {
        // Slow down to winner
        const currentAngle = progress * finalAngle;
        setRotationAngle(currentAngle % 360);
        
        if (progress >= 1) {
          onSpinComplete && onSpinComplete();
          return;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    if (spinning || (winner && !spinning)) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [spinning, winner, finalAngle, onSpinComplete]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        style={{ display: 'block', margin: '0 auto' }}
      />
    </div>
  );
};

export default WheelSpinner;