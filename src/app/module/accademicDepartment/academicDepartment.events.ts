import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';
import { AccademicDepartmentService } from './acedemicDepartment.service';

export const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (data: string) => {
      await AccademicDepartmentService.insertIntoDBFromEvent(JSON.parse(data));
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (data: string) => {
      await AccademicDepartmentService.updateOneInDBFromEvent(JSON.parse(data));
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    async (data: string) => {
      await AccademicDepartmentService.deleteOneFromDBFromEvent(
        JSON.parse(data)
      );
    }
  );
};
