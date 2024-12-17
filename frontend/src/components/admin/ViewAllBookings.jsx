import useGetAllBookings from '@/hooks/useGetAllBookings';
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from 'react-redux';

const ViewAllBookings = () => {
  const {id}=useParams();
  useGetAllBookings(id);
  const {bookings}=useSelector(store=>store.booking)
  console.log(bookings);
  
  return (
    <div>
      <Navbar/>
      <div>
        <div>
          All Bookings 
        </div>
        <Table>
          <TableCaption>A list of recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No of Travellers</TableHead>
              <TableHead className="">Special Request</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length == 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Bookings Found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">{book?.name}</TableCell>
                  <TableCell>{book?.number}</TableCell>
                  <TableCell>{book?.email}</TableCell>
                  <TableCell>{book?.travelersNumber}</TableCell>
                  <TableCell className="max-w-1">{book?.specialrequest||"NA"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>

      </div>
    </div>
  );
}

export default ViewAllBookings;
