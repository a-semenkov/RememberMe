import React from 'react';

import { ReactComponent as Angry } from '../../../assets/emojis/angry.svg';
import { ReactComponent as Confused } from '../../../assets/emojis/confused.svg';
import { ReactComponent as Crying } from '../../../assets/emojis/crying.svg';
import { ReactComponent as Happy } from '../../../assets/emojis/happy.svg';
import { ReactComponent as Hard } from '../../../assets/emojis/hard.svg';
import { ReactComponent as Laughing } from '../../../assets/emojis/laughing.svg';
import { ReactComponent as Muted } from '../../../assets/emojis/muted.svg';
import { ReactComponent as Sleepy } from '../../../assets/emojis/sleepy.svg';
import { ReactComponent as Surprised } from '../../../assets/emojis/surprised.svg';

// TODO: отредактировать пути

const MOOD_LIST = [
  { id: 'angry', value: <Angry /> },
  { id: 'confused', value: <Confused /> },
  { id: 'crying', value: <Crying /> },
  { id: 'happy', value: <Happy /> },
  { id: 'hard', value: <Hard /> },
  { id: 'laughing', value: <Laughing /> },
  { id: 'muted', value: <Muted /> },
  { id: 'sleepy', value: <Sleepy /> },
  { id: 'surprised', value: <Surprised /> },
];

export default MOOD_LIST;
