import { useState, useEffect } from 'react';

function ChangingProgressProvider({ values, interval = 1000, children }) {
  const [valuesIndex, setValuesIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!loaded) {
      intervalId = setInterval(() => {
        setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
      }, interval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [values, interval, loaded]);

  useEffect(() => {
    if (valuesIndex === values.length - 1) {
      setLoaded(true);
    }
  }, [valuesIndex, values]);

  return children(values[valuesIndex]);
}

export default ChangingProgressProvider;
