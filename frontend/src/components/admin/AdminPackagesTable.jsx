import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useSelector } from 'react-redux';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const AdminPackagesTable = () => {
  const { packages } = useSelector(store => store.package);
  const deletePackage = async (packageId) => {
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/packages/${packageId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent packages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pack) => (
            <TableRow key={pack?._id}>
              <TableCell className="font-medium">{pack?.title}</TableCell>
              <TableCell>₹{pack?.price}</TableCell>
              <TableCell>
                {new Date(pack?.startDate).toLocaleDateString("en-GB")} {" - "}
                {new Date(pack?.endDate).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell >{pack?.bookings?.length} people</TableCell>
              <TableCell>
                <Popover >
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="flex flex-col w-fit justify-center">
                    <Link to={`/packages/update/${pack?._id}`} className='hover:text-blue-600 hover:underline'>Edit Package</Link>

                    <div className='hover:text-blue-600 hover:underline cursor-pointer' onClick={() => {
                      deletePackage(pack._id)
                    }}>Delete Package</div>

                    <Link to={`/packages/${pack._id}/bookings`} className='hover:text-blue-600 hover:underline'>View Bookings</Link>
                  </PopoverContent>
                </Popover>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}

export default AdminPackagesTable;
