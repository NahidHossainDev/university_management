import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './accademicSemester.constant';
import { AccademicSemesterService } from './accedemicSemester.service';

export const intiAcademicSemesterEvent = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (data: string) => {
      await AccademicSemesterService.createSemesterFromEvent(JSON.parse(data));
    }
  );
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATED,
    async (data: string) => {
      await AccademicSemesterService.updateOneIntoDBFromEvent(JSON.parse(data));
    }
  );
  RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_DELETED,
    async (data: string) => {
      await AccademicSemesterService.deleteOneFromDBFromEvent(JSON.parse(data));
    }
  );
};
