import { useState, useEffect, useRef } from 'react';

interface VoiceCommandLog {
  timestamp: string;
  command: string;
  recognized: boolean;
}

export const useVoiceRecognition = (onCommandDetected?: (command: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState<VoiceCommandLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const commands = [
    { keywords: ['help', 'save me', 'bachao', 'emergency'], command: 'SOS_TRIGGER' },
    { keywords: ['call police', 'call emergency', 'dial 112'], command: 'CALL_EMERGENCY' },
    { keywords: ['navigate home', 'go home', 'safe route home'], command: 'NAVIGATE_HOME' },
    { keywords: ['share location', 'send coordinates', 'track me'], command: 'SHARE_LOCATION' }
  ];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // English (India) and handles local accents well

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        processTranscript(finalTranscript.toLowerCase());
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const processTranscript = (text: string) => {
    let commandFound = false;

    for (const cmd of commands) {
      for (const kw of cmd.keywords) {
        if (text.includes(kw)) {
          commandFound = true;
          const newLog: VoiceCommandLog = {
            timestamp: new Date().toLocaleTimeString(),
            command: cmd.command,
            recognized: true
          };

          setHistory(prev => [newLog, ...prev]);

          if (onCommandDetected) {
            onCommandDetected(cmd.command);
          }
          break;
        }
      }
      if (commandFound) break;
    }

    if (!commandFound) {
      const newLog: VoiceCommandLog = {
        timestamp: new Date().toLocaleTimeString(),
        command: text,
        recognized: false
      };
      setHistory(prev => [newLog, ...prev]);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (err: any) {
        setError(`Failed to start recognition: ${err.message}`);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    history,
    error,
    startListening,
    stopListening
  };
};

export default useVoiceRecognition;
