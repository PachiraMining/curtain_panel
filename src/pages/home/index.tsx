import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from '@ray-js/components'
import styles from './index.module.less'
import { useActions, useProps } from '@ray-js/panel-sdk'
import Curtain from "@/components/curtain";
import { showToast } from '@ray-js/ray';
import Strings from '@/i18n';

import { useDevInfo } from "@ray-js/panel-sdk";
import { useAtomValue } from "jotai";
// import { selectDpStateAtom } from "@/atoms";

export default function Home() {

  const devInfo = useDevInfo() || {};
  // const dpState = useAtomValue(selectDpStateAtom) || {};
  console.log("devInfo", devInfo); // print and view devInfo content
  // console.log("dpState", dpState); // print and view the content of dpState
  // return <View className={styles.container}>hello world</View>;
  // return (
  //   <View>
  //     {Object.keys(devInfo.schema || {}).map((dpCode) => {
  //       // Traverse and render each function point
  //       return (
  //         <View key={dpCode}>
  //           {dpCode}: {dpState[dpCode]}
  //         </View>
  //       );
  //     })}
  //   </View>
  // );


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

  return (
    <View className={styles.view}>
      <View className={styles.curtainBox}>
        <View className={styles.curtain} >
          <Curtain control={control} work_state={Strings.getDpLang("work_state", work_state)} value={convertPercent} bindchangend={onChangend}></Curtain>
        </View>
        <View className={styles.control}>
          <View className={styles.controlOpen} onClick={open}></View>
          <View className={styles.controlStop} onClick={stop}></View>
          <View className={styles.controlClose} onClick={close}></View>
        </View>
        <View className={styles.info}>
          <View className={styles.container}>hello world</View>
          <View className={styles.container}>hello world</View>
        </View>

        <View className={styles.info}>
          <View className={styles.controlBool} onClick={toggleBooleanOne}></View>
        </View>
      </View>

    </View>
  )
}
