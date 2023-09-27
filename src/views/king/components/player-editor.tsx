import React, { createRef, FC, useEffect } from 'react';
import { IPlayer } from '@/api/king/player';
import { Form, Dialog, Input, TextArea, Button } from 'antd-mobile';
import { FormInstance } from 'rc-field-form';

type PlayerEditorPorps = {
	visible: boolean;
	target?: IPlayer;
	onClose: () => void;
	onConfirm: () => void;
}

const PlayerEditor: FC<PlayerEditorPorps> = (props) => {
	const { visible, target, onClose, onConfirm } = props;
	const formRef = createRef<FormInstance>();
	const onFinish = async () => {
		const submitForm = {
			...target,
			...formRef.current?.getFieldsValue(),
		}
		console.log(submitForm);
	}

	useEffect(() => {
		if (target) {
			formRef.current?.setFieldsValue({
				...target,
				moves: [...target.moves],
			});
		}
	}, [target]);

	if (!target) return null;

	return (
		<Dialog
			visible={visible}
			closeOnMaskClick={true}
			onClose={onClose}
			content={
				<Form
					layout="horizontal"
					style={{'--prefix-width': '60px'}}
					onFinish={onFinish}
					ref={formRef}
					footer={<Button block type="submit" size="small">确定</Button>}
				>
					<Form.Item label="pm" name="name">
						<Input />
					</Form.Item>
					<Form.Item label="特性" name="ability">
						<Input />
					</Form.Item>
					<Form.Item label="道具" name="item">
						<Input />
					</Form.Item>
					<Form.Item label="move1" name={["moves", 0]}>
						<Input />
					</Form.Item>
					<Form.Item label="move2" name={["moves", 1]}>
						<Input />
					</Form.Item>
					<Form.Item label="move3" name={["moves", 2]}>
						<Input />
					</Form.Item>
					<Form.Item label="move4" name={["moves", 3]}>
						<Input />
					</Form.Item>
					<Form.Item label="remark" name="remark">
						<TextArea rows={3} />
					</Form.Item>
				</Form>
			}
		/>
	)
}

export default PlayerEditor;
