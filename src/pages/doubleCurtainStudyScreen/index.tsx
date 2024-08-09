import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from '@ray-js/components'
import styles from './index.module.less'
import { useActions, useProps } from '@ray-js/panel-sdk'
import Curtain from "@/components/curtain";
import { showToast } from '@ray-js/ray';
import Strings from '@/i18n';
import { router } from '@ray-js/ray';

import { useDevInfo } from "@ray-js/panel-sdk";
import { useAtomValue } from "jotai";
// import { selectDpStateAtom } from "@/atoms";

export default function StudyScreen() {

  const devInfo = useDevInfo() || {};
  // const dpState = useAtomValue(selectDpStateAtom) || {};
  console.log("devInfo", devInfo); // print and view devInfo content

  const { control, percent_control, percent_state, work_state, situation_set, detect_master} = useProps();
  const actions = useActions();

  const convert = useCallback((value) => {
    if (situation_set === 'fully_close') return value;
    return 100 - value;
  }, [situation_set]);

  const reverse = useCallback((value) => {
    if (situation_set === 'fully_close') return value;
    return 100 - value;
  }, [situation_set]);

  const convertPercent = useMemo(() => convert(percent_control), [percent_control, situation_set])

  const onChangend = useCallback((e) => {
    const nextPercent = reverse(e.detail.value);
    if (nextPercent < percent_control) {
      actions.control.set('open');
    } else {
      actions.control.set('close');
    }
    actions.percent_control.set(nextPercent);
  }, [percent_control, situation_set]);

  const open = useCallback(() => {
    actions.control.set('open', { immediate: true });
    actions.percent_control.set(reverse(0), { immediate: true });
  }, [situation_set]);

  const close = useCallback(() => {
    actions.control.set('close', { immediate: true });
    actions.percent_control.set(reverse(100), { immediate: true });
  }, [situation_set]);

  const stop = useCallback(() => {
    actions.control.set('stop', { immediate: true });
  }, []);

  const toggleBooleanOne = useCallback(() => {
    actions.detect_master.set(true, { immediate: true });
  }, []);

  const handleClick = () => {
    router.push("/setting");
  };

  return (
    <View className={styles.layout}>
      <View className={styles.curtainBox}></View>
      <View className={styles.text}>
        lorem ipsum dolor sit amet consectetur adipiscing elit
      </View>
      <View className={styles.textSecondary}>
        lorem ipsum dolor sit amet consectetur adipiscing elit
      </View>
      <View className={styles.study} onClick={handleClick}>
        Start Study
      </View>
      <View className={styles.textThird}>
        lorem ipsum dolor sit amet consectetur adipiscing elit
      </View>
      <View className={styles.left}  onClick={handleClick}>
         Left
      </View>
      <View className={styles.right} onClick={handleClick}>
         Right
      </View>
    </View>
  );
}
