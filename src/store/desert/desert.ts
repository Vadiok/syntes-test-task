import {
  Module,
  Action,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';
import { Food } from '@/entities/Food';
import { PaginatedList } from '@/entities/PaginatedList';
import { ModuleTitles } from '../ModuleTitles';
import { fakeDesertFetch } from './fakeDesertFetch';

interface FetchParams {
  page?: number;
  perPage?: number;
  orderField?: keyof Food;
  orderByDesc?: boolean;
}

@Module({
  namespaced: true,
  name: ModuleTitles.Desert,
})
export class DesertModule extends VuexModule {
  items: Food[] = [];

  loading = false;

  page = 1;

  perPage = 10;

  total: number|null = null;

  get itemsLoaded(): boolean {
    return this.total !== null;
  }

  @Action
  fetchData(params: FetchParams = {}) {
    this.setLoading(true);
    fakeDesertFetch(
      params.page || 1,
      params.perPage || 10,
      params.orderField || 'title',
      !!params.orderByDesc,
    )
      .then(this.setData)
      .finally(() => this.setLoading(false));
  }

  @Mutation
  setData(response: PaginatedList<Food>) {
    this.items = [...response.items];
    this.page = response.page;
    this.perPage = response.perPage;
    this.total = response.total;
  }

  @Mutation
  setLoading(value = true) {
    this.loading = value;
  }
}
