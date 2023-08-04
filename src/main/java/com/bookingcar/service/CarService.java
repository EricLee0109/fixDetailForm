package com.bookingcar.service;

import com.bookingcar.domain.*;
import com.bookingcar.repository.*;

import java.util.List;
import java.util.Optional;

import com.bookingcar.web.rest.errors.BadRequestAlertException;
import com.bookingcar.web.rest.vm.CarEnum;
import com.bookingcar.web.rest.vm.CreateCarVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Car}.
 */
@Service
@Transactional
public class CarService {

    private final Logger log = LoggerFactory.getLogger(CarService.class);

    private final CarRepository carRepository;

    private final CarModelRepository carModelRepository;

    private final ShowRoomRepository showRoomRepository;
    private final CarAttributeRepository carAttributeRepository;
    private final EmployeeRepository employeeRepository;

    public CarService(CarRepository carRepository, CarModelRepository carModelRepository, ShowRoomRepository showRoomRepository,
                      CarAttributeRepository carAttributeRepository, EmployeeRepository employeeRepository) {
        this.carRepository = carRepository;
        this.carModelRepository = carModelRepository;
        this.showRoomRepository = showRoomRepository;
        this.carAttributeRepository = carAttributeRepository;
        this.employeeRepository = employeeRepository;
    }

    /**
     * Save a car.
     *
     * @param car the entity to save.
     * @return the persisted entity.
     */
    public Car save(Car car) {
        log.debug("Request to save Car : {}", car);
        return carRepository.save(car);
    }

//    /**
//     * Update a car.
//     *
//     * @param car the entity to save.
//     * @return the persisted entity.
//     */
//    public Car update(Car car) {
//        log.debug("Request to update Car : {}", car);
//        return carRepository.save(car);
//    }
    @Transactional
    public Car update(CreateCarVM createCarVM, Long carId) {
        Car updateCar = carRepository.findById(carId).get();
        log.debug("Request to update Car : {}", updateCar);

        updateCar.setName(createCarVM.getName());
        updateCar.setPrice(createCarVM.getPrice());

        if (createCarVM.getCarModelId() != 0) {
            Optional<CarModel> updateCarModel = carModelRepository.findById(createCarVM.getCarModelId());
            if (updateCarModel.isPresent()) {
                updateCar.setCarmodel(updateCarModel.get());
            } else {
                throw new BadRequestAlertException("Entity not found", "Car Resource", "Car model idnotfound when update");
            }
        }

        if (createCarVM.getShowroomId() != 0) {
            Optional<ShowRoom> updateShowroom = showRoomRepository.findById(createCarVM.getShowroomId());
            if (updateShowroom.isPresent()) {
                updateCar.setShowroom(updateShowroom.get());
            } else {
                throw new BadRequestAlertException("Entity not found", "Car Resource", "Showroom idnotfound when update");
            }
        }

        if (createCarVM.getShowroomId() != 0) {
            Optional<ShowRoom> updateShowroom = showRoomRepository.findById(createCarVM.getShowroomId());
            if (updateShowroom.isPresent()) {
                updateCar.setShowroom(updateShowroom.get());
            } else {
                throw new BadRequestAlertException("Entity not found", "Car Resource", "Showroom idnotfound when update");
            }
        }

        if (createCarVM.getEmployeeId() != 0) {
            Optional<Employee> updateEmployee = employeeRepository.findById(createCarVM.getEmployeeId());
            if (updateEmployee.isPresent()) {
                updateCar.setEmployee(updateEmployee.get());
            } else {
                throw new BadRequestAlertException("Entity not found", "Car Resource", "Employee idnotfound when update");
            }
        }


        createCarVM.getCarattributes().forEach(attribute -> {
            Optional<CarAttribute> updateAtt = carAttributeRepository.findById(attribute.getAttributeId());
            if (updateAtt.isPresent()) {
                updateAtt.get().setAttributeValue(attribute.getAttributeValue());
                carAttributeRepository.save(updateAtt.get());
            } else {
                throw new BadRequestAlertException("Entity not found", "Car Resource", "Attribute idnotfound when update");
            }
        });

        return carRepository.save(updateCar);
    }

    /**
     * Partially update a car.
     *
     * @param car the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Car> partialUpdate(Car car) {
        log.debug("Request to partially update Car : {}", car);

        return carRepository
            .findById(car.getId())
            .map(existingCar -> {
                if (car.getPrice() != null) {
                    existingCar.setPrice(car.getPrice());
                }
                if (car.getName() != null) {
                    existingCar.setName(car.getName());
                }
                if (car.getStatus() != null) {
                    existingCar.setStatus(car.getStatus());
                }

                return existingCar;
            })
            .map(carRepository::save);
    }

    /**
     * Get all the cars.
     *
     * @return the list of entities.
     */

    @Transactional(readOnly = true)
    public List<Car> findAll(String area, long minPrice, long maxPrice, long brandId, String status) {
        log.debug("Request to get all Cars");
        return carRepository.findByShowroom_AreaContainingAndPriceBetweenAndCarmodel_Brand_IdAndStatusIs(area, minPrice, maxPrice, brandId, status);
    }

    @Transactional(readOnly = true)
    public List<Car> findAllWithoutBrand(String area, long minPrice, long maxPrice, String status) {
        log.debug("Request to get all Cars");
        return carRepository.findByShowroom_AreaContainingAndPriceBetweenAndStatusIs(area, minPrice, maxPrice, status);
    }

    @Transactional(readOnly = true)
    public List<Car> findWithCarModel(String area, long minPrice, long maxPrice, long brandId, long modelId, String status) {
        log.debug("Request to get all Cars");
        return carRepository.findByShowroom_AreaContainingAndPriceBetweenAndCarmodel_Brand_IdAndCarmodel_IdAndStatusIs(area, minPrice, maxPrice, brandId, modelId, status);
    }

    @Transactional(readOnly = true)
    public List<Car> findByCarmodel_Brand_Id(long brandId, String status) {
        log.debug("Request to get all Cars");
        return carRepository.findByCarmodel_Brand_IdAndStatusIs(brandId, status);
    }



    /**
     * Get one car by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Car> findOne(Long id) {
        log.debug("Request to get Car : {}", id);
        return carRepository.findById(id);
    }

    /**
     * Delete the car by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Car : {}", id);
        carRepository.deleteById(id);
    }

    public Optional<Car> deactiveCar(Long id) {
        log.debug("Request to deactive Car : {}", id);
        Car deactiveCar = carRepository.findById(id).get();
        deactiveCar.setStatus(CarEnum.Status.Deactive.toString());
        carRepository.save(deactiveCar);
        return Optional.of(deactiveCar);
    }

    public Optional<Car> activeCar(Long id) {
        log.debug("Request to deactive Car : {}", id);
        Car activeCar = carRepository.findById(id).get();
        activeCar.setStatus(CarEnum.Status.Active.toString());
        carRepository.save(activeCar);
        return Optional.of(activeCar);
    }
}
