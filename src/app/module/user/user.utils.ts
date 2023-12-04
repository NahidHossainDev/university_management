import { IAcademicSemester } from '../accademicSemester/accademicSemester.interface';
import { User } from './user.model';

export const getLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

export const generateUserId = async () => {
  const currentId = (await getLastUserId()) || String(0);
  return String(Number(currentId) + 1).padStart(5, '0');
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId = (await getLastUserId()) || String(0);
  let incrementedID = String(Number(currentId) + 1).padStart(5, '0');
  incrementedID = academicSemester.year.substring(2) + incrementedID;
  return incrementedID;
};

export const findLastFacultyID = async () => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id;
};

export const generateFacultyID = async () => {
  const currentId =
    (await findLastFacultyID()) || (0).toString().padStart(5, '0');
  const incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return `F-${incrementedID}`;
};
