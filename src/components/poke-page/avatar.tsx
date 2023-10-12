import React, { FC } from 'react';
import './sprite.css';

/**
 * M = 超进化
 * MX = megaX
 * MY = megaY
 * GM = 极巨化
 * F = 雌性形态
 * A = 阿罗拉
 * G = 嘉乐儿
 * H = 洗翠
 */
type IAvatarProps = {
  type?: 'M' | 'MX' | 'MY' | 'GM' | 'F' | 'A' | 'G' | 'H';
  value: string | number;
  shiny?: boolean;
}

const formatNum = (n: string | number) => n.toString().padStart(3,'0');

const Avatar: FC<IAvatarProps> = (props) => {
  const { type = '', value, shiny } = props;

  const cls:string = [
    shiny ? 'sprite-icon-shiny' : 'sprite-icon',
    `sprite-icon-${formatNum(value)}${type}`,
  ].join(' ');

  return (
    <span className={cls}></span>
  )
}

export default Avatar;
