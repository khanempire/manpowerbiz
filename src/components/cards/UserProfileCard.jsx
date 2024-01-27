/* eslint-disable react/prop-types */
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    Avatar,
    createStyles,
    rem,
    Table,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: rem(12),
        pointerEvents: 'none',
    },

    title: {
        display: 'block',
        marginTop: theme.spacing.md,
        marginBottom: rem(5),
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
    },
}));



export function UserProfileCard({ data }) {
    const ths = <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>User Type</th>
        <th>Contact Num</th>
        <th>WhatsApp Num</th>
        <th>Created At</th>
        <th>Updated At</th>
    </tr>
    const rows = <tr>
        <td>{data.SR}</td>
        <td>{data.fullName}</td>
        <td>{data.email}</td>
        <td>{data.status}</td>
        <td>{data.userType}</td>
        <td>{data.contactNumber}</td>
        <td>{data.whatsappNumber}</td>
        <td>{data.createdAt}</td>
        <td>{data.updatedAt}</td>
    </tr>

    return (<Table striped highlightOnHover withBorder withColumnBorders>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
    </Table>)


}