import { useState } from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  client_name,
  client_contact,
  event_date,
  capacity,
  session,
  cust_notes,
  payment_status,
  paid_amount,
  total_amount,
  // handleClick,
  handleEdit,
  handleDelete,
  
}) {
  const [open, setOpen] = useState(null);
  const [ hide , setHide ] = useState(true);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    setHide(true);
  };

  // const updateMenuItem = () => {
  //   console.log(id);
  // }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const getStatusColor = (payment_status) => {
    const statusColorMap = {
      pending: 'warning',
      partial: 'info',
      completed: 'success',
    };
  
    const lowercaseStatus = payment_status ? payment_status.toLowerCase() : '';
    return statusColorMap[lowercaseStatus] || 'error';
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={id}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none" sx={{ paddingLeft: '15px' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar /> */}
            <Typography variant="subtitle2" noWrap>
              {client_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell style={{ whiteSpace: 'nowrap' }}>{client_contact}</TableCell>

        <TableCell style={{ whiteSpace: 'nowrap' }}>{event_date}</TableCell>
        
        <TableCell>
            <Box sx={{ whiteSpace: 'pre-line' }}>
              {Array.isArray(session) ? (
                session.map((sessionValue, index) => (
                  <span key={index}>
                    {sessionValue !== undefined && (
                      <>
                        <Label style={{ marginTop: "3px" }} color='primary'>
                          {sessionValue}
                        </Label>
                        {index !== session.length - 1 && <span style={{ marginTop: '3px' }}>&nbsp;</span>}
                      </>
                    )}
                  </span>
                ))
              ) : (
                session !== undefined && (
                  <Label style={{ marginTop: "3px" }} color='primary'>
                    {session}
                  </Label>
                )
              )}
            </Box>
        </TableCell>


        <TableCell>{capacity}</TableCell>

        <TableCell>{paid_amount}</TableCell>

        <TableCell>{total_amount}</TableCell>

        <TableCell>
          <Label color={getStatusColor(payment_status)}>
            {payment_status} 
          </Label>
        </TableCell>

        <TableCell style={{ display: hide ? 'none' : 'table-cell' }}>{cust_notes}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={(e) => {handleEdit(id , e)}}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={(e) => handleDelete(id, e)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string,
  client_contact: PropTypes.string, 
  event_date: PropTypes.string, 
  capacity: PropTypes.number,
  session: PropTypes.any,
  cust_notes: PropTypes.string, 
  handleClick: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  paid_amount: PropTypes.any, 
  total_amount: PropTypes.any, 
  client_name: PropTypes.string,
  selected: PropTypes.bool,
  payment_status: PropTypes.string,
};
