import { Helmet } from 'react-helmet-async';
import ReservationsDetails from 'src/sections/overview/app/reservations-details';
// sections

// ----------------------------------------------------------------------

export default function ReservationsPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Reservations</title>
            </Helmet>

            <ReservationsDetails />
        </>
    );
}
