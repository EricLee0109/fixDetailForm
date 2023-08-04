package com.bookingcar.repository;

import com.bookingcar.domain.Car;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Car entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByShowroom_AreaContainingAndPriceBetweenAndCarmodel_Brand_IdAndStatusIs(String area, long minPrice, long maxPrice, long brandId, String status);

    List<Car> findByShowroom_AreaContainingAndPriceBetweenAndCarmodel_Brand_IdAndCarmodel_IdAndStatusIs(String area, long minPrice, long maxPrice, long brandId, long modelId, String status);

    List<Car> findByShowroom_AreaContainingAndPriceBetweenAndStatusIs(String area, long minPrice, long maxPrice, String status);

    List<Car> findByCarmodel_Brand_IdAndStatusIs(long brandId, String status);


}
