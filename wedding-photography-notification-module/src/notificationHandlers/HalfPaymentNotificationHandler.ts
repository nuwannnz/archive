import { BookingModal } from "../modals/BookingModal";
import { Booking } from "../types/booking";
import {
  NotificationHandler,
  NotificationRequest,
} from "../types/notification";
import { logger } from "../util/logger";

export class HalfPaymentBookingNotificationHandler
  implements NotificationHandler
{
  private async fetchBookings(): Promise<Booking[]> {
    let bookings: Booking[] = [];
    try {
      const today = new Date();
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);

      //   bookings = await BookingModal.find({
      //     paidAmount: 0,
      //     isActive: true,
      //     booked_date: { $gte: threeDaysAgo, $lte: today },
      //   }).populate("domain");
      bookings = await BookingModal.find().populate("domain");
    } catch (error) {
      logger.error(
        "HalfPaymentBookingNotificationHandler - failed to fetch bookings",
        error
      );
    } finally {
      return bookings;
    }
  }

  async getNotifications() {
    const bookings = await this.fetchBookings();
    let notifications: NotificationRequest[] = [];

    try {
      console.log("==> bookings", bookings);
      notifications = bookings.map((booking) => {
        return {
          to: booking.client_contact,
          from: booking.domain.reminder_from_email,
          messageBody: `Hi ${booking.client_name}, <br/> This a kind reminder to make a half payment to confirm your wedding photograpy session booking. <br/> Thank you <br/> ${booking.domain.owner_name}`,
        };
      });
      console.log("==> notifications", notifications);
    } catch (error) {
      logger.error(
        "HalfPaymentNotificationHandler - failed to get notifications",
        error
      );
    } finally {
      return notifications;
    }
  }
}
