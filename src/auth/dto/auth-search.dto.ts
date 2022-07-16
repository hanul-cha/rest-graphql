import { GraphQLEnumType } from 'graphql';

export enum AuthSearchQuestion {
  FAVORITE_PLACE = 'FAVORITE_PLACE',
  PLACE_OF_BIRTH = 'PLACE_OF_BIRTH',
  FIRST_SCHOOL = 'FIRST_SCHOOL',
  BEST_FRIEND = 'BEST_FRIEND',
  FIRST_JOB = 'FIRST_JOB',
  FAVORITE_FOOD = 'FAVORITE_FOOD',
}

export const GraphQLAuthSearchQuestion = new GraphQLEnumType({
  name: 'AuthSearchQuestion',
  values: {
    FAVORITE_PLACE: {
      value: AuthSearchQuestion.FAVORITE_PLACE,
      description: '좋아하는 장소',
    },
    PLACE_OF_BIRTH: {
      value: AuthSearchQuestion.PLACE_OF_BIRTH,
      description: '태어난 장소',
    },
    FIRST_SCHOOL: {
      value: AuthSearchQuestion.FIRST_SCHOOL,
      description: '첫 학교',
    },
    BEST_FRIEND: {
      value: AuthSearchQuestion.BEST_FRIEND,
      description: '가장 친한 친구',
    },
    FIRST_JOB: {
      value: AuthSearchQuestion.FIRST_JOB,
      description: '첫 직장',
    },
    FAVORITE_FOOD: {
      value: AuthSearchQuestion.FAVORITE_FOOD,
      description: '제일 좋아하는 음식',
    },
  },
});
