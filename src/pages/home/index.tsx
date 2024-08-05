import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from '@ray-js/components'
import styles from './index.module.less'
import { useActions, useProps } from '@ray-js/panel-sdk'
import Curtain from "@/components/curtain";
import { showToast } from '@ray-js/ray';
import Strings from '@/i18n';
import { useHistory } from 'react-router-dom';
import { useDevInfo } from "@ray-js/panel-sdk";
import { router } from '@ray-js/ray';
// import { selectDpStateAtom } from "@/atoms";

export default function Home() {
 
  const handleClick = () => {
    router.push("/setting");
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
