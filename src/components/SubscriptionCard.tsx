import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MoreHorizontal, Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SubscriptionCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  nextPayment: string;
  category: string;
  status: 'active' | 'canceled' | 'trial';
  logo?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetReminder?: (id: string) => void;
}

export function SubscriptionCard({
  id,
  name,
  price,
  currency,
  nextPayment,
  category,
  status,
  logo,
  onEdit,
  onDelete,
  onSetReminder
}: SubscriptionCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-gradient-success text-success-foreground">Ativo</Badge>;
      case 'trial':
        return <Badge variant="outline" className="border-warning text-warning">Trial</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">Ativo</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {logo ? (
                <img src={logo} alt={name} className="w-8 h-8 rounded" />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusBadge(status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(id)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSetReminder?.(id)}>
                  <Bell className="h-4 w-4 mr-2" />
                  Lembrete
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(id)}
                  className="text-destructive"
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-bold text-lg text-foreground">
              {formatPrice(price, currency)}
            </span>
            <span className="text-sm text-muted-foreground">/mês</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(nextPayment)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}