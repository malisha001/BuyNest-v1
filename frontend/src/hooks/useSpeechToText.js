import { useEffect, useRef, useState } from 'react';

function useSpeechToText(option) {
  const [isListning, setIsListning] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recongnitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Browser not supported');
      return;
    }

    recongnitionRef.current = new window.webkitSpeechRecognition();
    const recongnition = recongnitionRef.current;
    recongnition.interimResults = option.interimResults || true;
    recongnition.lang = option.lang || 'en-US';
    recongnition.continuous = option.continuous || true;

    if ('webkitSpeechGrammerList' in window) {
      const grammer = '#JSGF V1.0; grammer punctuation; public <punk> = . | , | ? | ! | ; | : ;';
      const speechRecognitionList = new window.webkitSpeechGrammerList();
      speechRecognitionList.addFromString(grammer, 1);
      recongnition.grammers = speechRecognitionList;
    }

    recongnition.onresult = (event) => {
      let text = ''; // Initialize text as an empty string
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text); // Set the final result in the state
    };

    recongnition.onerror = (event) => {
      console.log('Speech recognition error', event.error);
    };

    recongnition.onend = () => {
      setIsListning(false);
      setTranscript('');
    };

    return () => {
      if (recongnition) {
        recongnition.stop();
      }
    };
  }, []);

  const startListning = () => {
    if (recongnitionRef.current && !isListning) {
      recongnitionRef.current.start();
      setIsListning(true);
    }
  };

  const stopListning = () => {
    if (recongnitionRef.current && isListning) {
      recongnitionRef.current.stop();
      setIsListning(false);
    }
  };

  return { isListning, transcript, startListning, stopListning };
}

export default useSpeechToText;
