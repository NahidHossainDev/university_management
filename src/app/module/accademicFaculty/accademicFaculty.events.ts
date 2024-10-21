import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './accademicFaculty.constant';
import { AccademicFacultyService } from './accedemicFaculty.service';

export const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_CREATED,
    async (data: string) => {
      await AccademicFacultyService.insertIntoDBFromEvent(JSON.parse(data));
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_UPDATED,
    async (data: string) => {
      await AccademicFacultyService.updateOneInDBFromEvent(JSON.parse(data));
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_FACULTY_DELETED,
    async (data: string) => {
      await AccademicFacultyService.deleteOneFromDBFromEvent(JSON.parse(data));
    }
  );
};
