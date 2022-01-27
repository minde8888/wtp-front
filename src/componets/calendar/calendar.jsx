import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es-es", {
  week: {
    dow: 1
  }
});
const localizer = momentLocalizer(moment);



const events = [{ start: new Date(), end: new Date(), title: "special event" }];

const DnDCalendar = withDragAndDrop(Calendar);

class BigCalendar extends Component {
  state = {
    events,
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  setSelectedDate = (e) => {
    console.log(e);
  };
  onNavigate = (e) => {
    console.log(e);
  };
  currentDate = (e) => {
    console.log(e);
  };
  onSelectEvent = (e) => {
    console.log(e);
  };
  onSelectSlot = (e) => {
    console.log(e);
  };

  renderEventsOnChange = (e) => {
    console.log(e);
  }

  render() {

    let formats = {
      // timeGutterFormat: 'HH:mm',
      timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, 'HH:mm', culture),
      eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
        let s = localizer.format(start, 'HH:mm', culture);
        let e = localizer.format(end, 'HH:mm', culture);
        return `${s} - ${e}`;
      },
      agendaTimeRangeFormat: ({ start, end }, culture, localizer) => {
        let s = localizer.format(start, 'HH:mm', culture);
        let e = localizer.format(end, 'HH:mm', culture);
        return `${s} - ${e}`;
      },
      dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
        let s = localizer.format(start, 'MMM DD', culture);
        let e = localizer.format(end, 'MMM DD', culture);
        return `${s} - ${e}`;
      }
    }

    return (
      <div className="App">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          eventPropGetter={e => ({ style: { backgroundColor: '#89C540', borderColor: '#777' } })}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "80vh" }}
          culture="no-NO"
          selectable={true}
          onDoubleClickEvent={this.onSelectEvent}
          onSelectSlot={this.onSelectSlot}
          onView={() => { }}
          // messages={{
          //   today: "To day",
          //   previous: "previous",
          //   next: "next",
          // }}
          formats={formats}
          messages={{
            date: 'date',
            time: 'time',
            event: 'event',
            allDay: 'allDay',
            week: 'week',
            day: 'day',
            month: 'month',
            previous: 'previous',
            next: 'next',
            yesterday: 'yesterday',
            tomorrow: 'tomorrow',
            today: 'today',
            agenda: 'agenda',
          }}
          scrollToTime={new Date()}
          //  onView={(view) => {
          //     if(view === 'week') {
          //       setTimeout(() => {
          //         document.querySelector('.rbc-time-header').childNodes[1].remove();
          //       }, 0);
          //     }
          //   }}
          // components={{
          //   eventWrapper: SingleEventWrapped,
          //   week: {
          //     event: EventWeekComponent,
          //   },
          //   agenda: {
          //     event: EventAgendaComponent,
          //   }
          // }}
          timeslots={2}
          step={30}
          onNavigate={(newDate) => this.renderEventsOnChange}
        />
      </div>
    );
  }
}

export default BigCalendar;
