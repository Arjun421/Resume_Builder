// Email validation using regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Additional validation helpers
export const validatePassword = (password) => {
  
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};


// get lightest average color
export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    // Check if imageUrl is valid
    if (!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('Invalid image URL'));
    }

    const img = new Image();

    // If not a base64 string, set crossOrigin (important for CORS)
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
  const red = imageData[i];
  const green = imageData[i + 1];
  const blue = imageData[i + 2];
  const brightness = (red + green + blue) / 3;

  // Only count light pixels (tweak threshold as needed)
  if (brightness > 180) {
    r += red;
    g += green;
    b += blue;
    count++;
  }
}

if (count === 0) {
  resolve('#ffffff'); // fallback if no bright pixels found
} else {
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);

  resolve(`rgb(${r}, ${g}, ${b})`);
}
    }


    img.onerror = () => reject(new Error('Failed to load image'));
  });
};
