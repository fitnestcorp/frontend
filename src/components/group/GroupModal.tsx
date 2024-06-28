'use client';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { Close, EditOutlined } from '@mui/icons-material';

import { GroupForm } from '@/components';
import { useGetGroupByIdQuery } from '@/store';

interface Props {
	refetch: () => void;
	groupId?: string;
}

/**
 * GroupModal component for creating or editing groups.
 *
 * @param {Props} props - The component properties.
 * @param {Function} props.refetch - Function to refetch data after creating or editing a group.
 * @param {string} [props.groupId] - The ID of the group to be edited.
 * @returns {JSX.Element} The rendered GroupModal component.
 */
export const GroupModal = ({ refetch, groupId }: Props) => {
	const [open, setOpen] = useState(false);

	const { data: group } = useGetGroupByIdQuery(groupId ?? '');

	/**
	 * Opens the modal dialog.
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{groupId ? (
				<Tooltip title="Editar" arrow>
					<IconButton
						onClick={handleClickOpen}
						sx={{
							color: '#1565c0',
						}}
					>
						<EditOutlined />
					</IconButton>
				</Tooltip>
			) : (
				<Button
					onClick={handleClickOpen}
					variant="contained"
					sx={{
						borderRadius: '0.5rem',
					}}
				>
					Crear Grupo
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				sx={{
					'& .MuiDialog-paper': {
						borderRadius: '0.5rem',
					},
				}}
			>
				<DialogTitle>
					<IconButton
						onClick={handleClose}
						sx={{
							position: 'absolute',
							top: 10,
							right: 10,
							color: 'gray',
						}}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{group ? (
						<GroupForm refetch={refetch} group={group} />
					) : (
						<GroupForm refetch={refetch} />
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
