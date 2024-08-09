import React, { useCallback, useMemo, useState } from 'react';
import { View } from '@ray-js/components';
import styles from './index.module.less';
import { useActions, useProps } from '@ray-js/panel-sdk';
import { router } from '@ray-js/ray';
import { useDevInfo } from "@ray-js/panel-sdk";
import { Switch, Button } from '@ray-js/ray';


export default function PairScreen() {
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);

  const handleSwitch1Change = (e) => {
    const isChecked = e.detail.value;
    setIsSwitchOn1(isChecked);
    if (isChecked) {
      setIsSwitchOn2(false);
    }
  };

  const handleSwitch2Change = (e) => {
    const isChecked = e.detail.value;
    setIsSwitchOn2(isChecked);
    if (isChecked) {
      setIsSwitchOn1(false);
    }
  };
  
  const isButtonDisabled = !isSwitchOn1 && !isSwitchOn2;

  const handleClick = () => {
    if (isSwitchOn1) {
      router.push("/singleCurtainStudyScreen");
    } else if (isSwitchOn2) {
      router.push("/doubleCurtainStudyScreen");
    }
  };

  return (
    <View className={styles.layout}>
      <View className={styles.rectangle}>
        <View className={styles.text}>
          Open from one side
        </View>

        <View className={styles.switchContainer}>
          <Switch
            checked={isSwitchOn1}
            onChange={handleSwitch1Change}
            color={isSwitchOn1 ? '#01CAFE' : '#007AFF'} // Example of changing color based on state
          />
        </View>
      </View>
      <View className={styles.rectangle2}>
        <View className={styles.text}>
          Open from the middle
        </View>
        <View className={styles.switchContainer}>
          <Switch
            checked={isSwitchOn2}
            onChange={handleSwitch2Change}
            color={isSwitchOn2 ? '#01CAFE' : '#007AFF'} // Example of changing color based on state
          />
        </View>
      </View>
      <View className={styles.buttonContainer}>
        <Button disabled={isButtonDisabled} onClick={handleClick}>
          click me
        </Button>    

      </View>
    </View>
  );
}
