import { Helmet } from 'react-helmet-async';
// sections
import { CalendarView } from 'src/sections/calendar/view';
import CustomComponentsView from 'src/sections/custom-components/custom-components-view';

// ----------------------------------------------------------------------

export default function CustomComponentsPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Custom Components</title>
            </Helmet>

            <CustomComponentsView />
        </>
    );
}
