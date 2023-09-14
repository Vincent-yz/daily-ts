import React, { FC, useState } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd-mobile';

// const

const DataSync:FC = () => {
  const [start, setStart] = useState("1");
  const [end, setEnd] = useState("10");


  const fetcher = async(num:number) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((response) => {
      const res = response.data;

      const data = {
        'national_num': res.id,
        'name': res.name,
        'type_id1': '',
        'type_id2': '',
        'generation': 0,
        'height': res.height / 10,
        'weight': res.weight / 10,
        'gender': '1:1',
        'ability_id1': '',
        'ability_id2': '',
        'ability_id3': '',
        'egg_group_id1': '',
        'egg_group_id2': '',
        'catch_rate': 0,
        'base_stats': {
            'defense': 0,
            'attack': 0,
            'hp': 0,
            'sp_attack': 0,
            'sp_defense': 0,
            'speed': 0
        }
      }

      const { types, abilities, stats } = res;

      data['type_id1'] = types[0].type.name;
      if (types.length === 2) {
        data['type_id2'] = types[1].type.name;
      }

      data['ability_id1'] = abilities[0].ability.name;
      if (abilities.length === 2) {
        if (abilities[1].is_hidden) {
          data['ability_id3'] = abilities[1].ability.name;
        } else {
          data['ability_id2'] = abilities[1].ability.name;
        }
      } else if (abilities.length === 3) {
        data['ability_id2'] = abilities[1].ability.name;
        data['ability_id3'] = abilities[2].ability.name;
      }

      data['base_stats']['hp'] = stats[0]['base_stat'];
      data['base_stats']['attack'] = stats[1]['base_stat'];
      data['base_stats']['defense'] = stats[2]['base_stat'];
      data['base_stats']['sp_attack'] = stats[3]['base_stat'];
      data['base_stats']['sp_defense'] = stats[4]['base_stat'];
      data['base_stats']['speed'] = stats[5]['base_stat'];

      // console.log(data);
      return data;
    });
  }

  const importData = async(data:Object) => {
    return await axios.post('http://localhost:8080/classic/pokemon', data);
  }

  const onClick = async() => {
    const intStart = parseInt(start);
    const intEnd = parseInt(end);
    if (intStart - intEnd > 0) {
      console.error("范围错误");
      return;
    }

    for (let i = intStart; i <= intEnd; i++) {
      const data = await fetcher(i);
      const res = await importData(data);
      if (res.data.code !== 0) {
        console.error("保存失败");
        console.log(res);
        return;
      }
    }
  }

  return (
    <div>
      <div>
        <span>开始</span>
        <Input value={start} onChange={setStart} />
      </div>
      <div>
        <span>结束</span>
        <Input value={end} onChange={setEnd} />
      </div>
      <div>
        <Button onClick={onClick}>
          同步
        </Button>
      </div>
    </div>
  )
}

export default DataSync;
