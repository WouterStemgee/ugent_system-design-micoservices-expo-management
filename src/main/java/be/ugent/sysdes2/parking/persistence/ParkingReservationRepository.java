package be.ugent.sysdes2.parking.persistence;

import be.ugent.sysdes2.parking.domain.ParkingReservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ParkingReservationRepository extends CrudRepository<ParkingReservation, Long> {

    @Query("SELECT r FROM ParkingReservation r WHERE (r.endDate >= startDate AND r.startDate <= endDate)")
    List<ParkingReservation> findByStartDateAndEndDate(LocalDate startDate, LocalDate endDate);
}
